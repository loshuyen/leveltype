import React from 'react'

const PrivacyPolicyPage = () => {
  return (
    <main className="max-w-2xl mx-auto p-6 text-zinc-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">隱私權政策</h1>

      <p className="mb-4">
        本網站（LevelType）非常重視您的個人資料保護。為了讓您能安心使用本服務，特此說明我們的隱私權保護政策如下，請您詳閱：
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">一、資料蒐集範圍</h2>
      <p className="mb-4">
        本服務使用 Google 帳號登入，會向 Google 取得您的：
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Google 顯示名稱</li>
        <li>電子郵件信箱</li>
        <li>頭像圖片（如有）</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">二、資料使用目的</h2>
      <p className="mb-4">
        所取得的使用者資訊僅用於以下目的：
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>識別使用者身份</li>
        <li>在平台中顯示基本使用者資訊</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">三、資料保護與分享</h2>
      <p className="mb-4">
        我們不會將您的個人資料提供給任何第三方，除非基於法律規定或政府機關要求。
        所有資料皆儘可能採取保護措施，防止未授權存取。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">四、隱私政策修改</h2>
      <p className="mb-4">
        本隱私權政策如有修改，將公告於本頁面，恕不另行個別通知。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">五、聯絡我們</h2>
      <p className="mb-4">
        若您對本政策有任何疑問，歡迎來信聯絡我們：
        <a href="mailto:service@leveltype.site" className="text-blue-600 underline">service@leveltype.site</a>
      </p>

      <p className="text-sm text-zinc-500 mt-6">更新日期：2025 年 6 月 13 日</p>
    </main>
  );
}

export default PrivacyPolicyPage