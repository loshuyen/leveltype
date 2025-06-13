import React from 'react'

export default function TermsOfServicePage() {
  return (
    <main className="max-w-2xl mx-auto p-6 text-zinc-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">服務條款</h1>

      <p className="mb-4">
        歡迎使用 LevelType（以下簡稱「本服務」）。使用本服務前，請務必詳細閱讀以下服務條款，當您開始使用本服務，即視為您已閱讀、瞭解並同意本條款內容。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">一、服務內容</h2>
      <p className="mb-4">
        本服務提供文字輸入與處理相關的功能，透過 Google 帳號登入後即可使用。
        本平台保有隨時新增、修改或終止服務內容的權利。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">二、使用者責任</h2>
      <p className="mb-4">
        使用者不得從事任何違反中華民國法律、侵犯他人權益、或干擾本服務運作的行為。若有違反，本服務有權終止使用者的使用權限。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">三、帳號與資料</h2>
      <p className="mb-4">
        使用 Google OAuth 登入的帳號資料，僅用於識別與登入用途。本服務不會擅自變更、儲存或使用您的帳號資訊作為其他用途，詳見<a href="/privacy-policy" className="text-blue-600 underline">隱私權政策</a>。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">四、免責聲明</h2>
      <p className="mb-4">
        本服務以「現況提供」，對於資料正確性、即時性或可用性不提供任何保證。如因使用本服務所造成的任何直接或間接損害，本服務不負任何法律責任。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">五、條款修改</h2>
      <p className="mb-4">
        本服務有權隨時修改本條款，修改後將公告於本頁面，您繼續使用本服務即視為同意修改後之內容。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">六、聯絡方式</h2>
      <p className="mb-4">
        若您對本條款有任何疑問，歡迎透過電子郵件與我們聯繫：
        <a href="mailto:service@leveltype.site" className="text-blue-600 underline">service@leveltype.site</a>
      </p>

      <p className="text-sm text-zinc-500 mt-6">更新日期：2025 年 6 月 13 日</p>
    </main>
  );
}
