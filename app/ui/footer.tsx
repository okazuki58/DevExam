import Link from "next/link";
import { FaTwitter, FaGithub, FaEnvelope, FaArrowRight } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        {/* ロゴとコピーライト部分 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-slate-700/50">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              YourBrand
            </h2>
            <p className="text-slate-400 mt-2 max-w-md">
              エンジニアの成長をサポートするプラットフォーム。演習、クイズ、求人情報など、あなたのキャリアをサポートします。
            </p>
          </div>
          <div className="flex space-x-5">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 p-3 rounded-full hover:bg-blue-500 transition-all duration-300"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 p-3 rounded-full hover:bg-gray-600 transition-all duration-300"
            >
              <FaGithub className="text-xl" />
            </a>
            <a
              href="mailto:support@example.com"
              className="bg-slate-800 p-3 rounded-full hover:bg-purple-500 transition-all duration-300"
            >
              <FaEnvelope className="text-xl" />
            </a>
          </div>
        </div>

        {/* メインリンク部分 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              サイトマップ
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "ホーム" },
                { href: "/exercises", label: "演習" },
                { href: "/quizzes", label: "クイズ" },
                { href: "/jobs", label: "求人" },
                { href: "/companies", label: "企業" },
              ].map((link) => (
                <li key={link.href} className="group">
                  <Link
                    href={link.href}
                    className="flex items-center text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaArrowRight className="h-3 w-3 text-blue-400" />
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              リソース
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/documents", label: "ドキュメント" },
                { href: "/badges", label: "バッジ" },
                { href: "/profile", label: "マイプロフィール" },
                { href: "/faq", label: "よくある質問" },
              ].map((link) => (
                <li key={link.href} className="group">
                  <Link
                    href={link.href}
                    className="flex items-center text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaArrowRight className="h-3 w-3 text-blue-400" />
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              法的情報
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/terms", label: "利用規約" },
                { href: "/privacy", label: "プライバシーポリシー" },
                { href: "/cookie", label: "Cookieポリシー" },
              ].map((link) => (
                <li key={link.href} className="group">
                  <Link
                    href={link.href}
                    className="flex items-center text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaArrowRight className="h-3 w-3 text-blue-400" />
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              お問い合わせ
            </h3>
            <p className="text-slate-300 mb-4">
              サポートが必要ですか？お気軽にご連絡ください。
            </p>
            <a
              href="mailto:support@example.com"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              <FaEnvelope className="mr-2" /> サポートに連絡する
            </a>
          </div>
        </div>

        {/* コピーライト部分 */}
        <div className="mt-12 pt-6 border-t border-slate-700/50 text-center text-sm text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
