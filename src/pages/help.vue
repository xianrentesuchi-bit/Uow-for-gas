<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const faqs = ref([
  {
    question: 'アカウントはどのように作成しますか？',
    answer: 'メニューの「新規登録」から、ユーザー名とパスワードのみで簡単に作成できます。メールアドレスなどの個人情報は必要ありません。'
  },
  {
    question: '固有ID（userId）とは何ですか？',
    answer: 'アカウント作成時にシステムによって自動的にランダム生成される一意のコードです。このIDを使うことで、他のアプリやサービスと安全にデータを接続・共有することができます。'
  },
  {
    question: 'データの同期・インポート方法を教えてください。',
    answer: 'マイページから「現在のデータをアカウントへ保存」を押すと、ローカル（プレイリストや履歴）のデータがクラウドに保存されます。「保存データからインポート」を押すと、別デバイスからでも同じデータを復元・共有できます。'
  },
  {
    question: 'ログインがうまくできない場合は？',
    answer: 'ユーザー名とパスワードの文字（大文字・小文字、半角・全角）が正しく入力されているか再度ご確認ください。解決しない場合は、新規にアカウントを作り直してください。'
  }
]);

const goToHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="max-w-2xl mx-auto mt-10 p-6 bg-white border border-zinc-200 shadow-md rounded-xl">
    <div class="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
      <h1 class="text-xl font-bold text-zinc-800 flex items-center gap-2">
        <span class="material-symbols-outlined text-blue-600">help</span>
        ヘルプ・センター
      </h1>
      <button 
        @click="goToHome" 
        class="h-8 px-3 flex items-center justify-center gap-1 border border-zinc-300 rounded-lg text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
      >
        <span class="material-symbols-outlined text-[16px]">arrow_back</span>
        戻る
      </button>
    </div>

    <div class="space-y-6">
      <section>
        <h2 class="text-sm font-bold text-zinc-700 mb-3 flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px] text-zinc-500">quiz</span>
          よくある質問 (FAQ)
        </h2>
        
        <div class="space-y-4">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index" 
            class="p-4 bg-zinc-50 border border-zinc-100 rounded-lg"
          >
            <p class="text-sm font-bold text-zinc-800 flex items-start gap-2">
              <span class="text-blue-600 font-mono">Q.</span>
              {{ faq.question }}
            </p>
            <p class="text-xs text-zinc-600 mt-2 leading-relaxed pl-5">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </section>

      <section class="border-t border-zinc-100 pt-6">
        <h2 class="text-sm font-bold text-zinc-700 mb-2 flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px] text-zinc-500">info</span>
          このシステムについて
        </h2>
        <p class="text-xs text-zinc-500 leading-relaxed pl-6">
          当システムは、ログインの簡略化とプライバシー保護を両立したアカウント管理システムです。作成されたアカウントは「uotube」連携用APIを介して、データのバックアップや各プラットフォーム間でのシームレスな同期を実現します。
        </p>
      </section>
    </div>
  </div>
</template>
