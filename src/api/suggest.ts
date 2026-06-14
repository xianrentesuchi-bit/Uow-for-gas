export async function fetchSuggestions(query: string): Promise<string[]> {
  if (!query.trim()) return []

  try {
    // client=youtube 形式で確実にJSON（またはプレーンな配列データ）が返るエンドポイントに最適化
    const url = `https://suggestqueries.google.com/complete/search?client=youtube&hl=ja&ds=yt&q=${encodeURIComponent(query)}`
    const response = await fetch(url)
    
    if (!response.ok) return []

    // 文字化けを防ぐため、Shift_JIS（またはUTF-8）のデコード処理を継続
    const arrayBuffer = await response.arrayBuffer()
    const decoder = new TextDecoder('shift_jis')
    const text = decoder.decode(arrayBuffer)

    // パターン1: window.google.ac.hr(...) もしくは外部コールバック関数で囲まれている場合の汎用抽出
    const jsonpMatch = text.match(/^[^(]*\(([\s\S]*)\)[^)]*$/)
    let jsonText = jsonpMatch ? jsonpMatch[1] : text

    try {
      const data = JSON.parse(jsonText)
      
      // YouTubeサジェストの基本構造: [ "クエリ", [ ["サジェスト1", 0], ["サジェスト2", 0] ], ... ]
      if (Array.isArray(data) && data[1] && Array.isArray(data[1])) {
        return data[1].map((item: any) => {
          if (Array.isArray(item)) {
            return item[0] // [ "サジェスト文字列", 0, [0] ] のようなネスト構造から抽出
          }
          if (typeof item === 'string') {
            return item
          }
          return ''
        }).filter(Boolean)
      }
    } catch (e) {
      // JSONパースに失敗した場合は、文字列から愚直にクォーテーション内の候補を抽出するフォールバック
      const stringMatches = text.match(/"([^"\\]|\\.)*"/g)
      if (stringMatches) {
        const candidates = stringMatches
          .map(m => m.replace(/"/g, ''))
          .filter(m => m !== query && m !== 'youtube' && m.length > 0)
        if (candidates.length > 0) {
          return [...new Set(candidates)].slice(0, 10)
        }
      }
    }

    return []
  } catch (error) {
    console.error('サジェストの取得中にエラーが発生しました:', error)
    return []
  }
}
