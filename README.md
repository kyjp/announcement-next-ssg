https://shimablogs.com/spa-ssr-ssg-difference
SSR SPA SSGの違い
https://zenn.dev/luvmini511/articles/1523113e0dec58
SSG と SSR で理解する Next.js のページレンダリング
https://zenn.dev/catnose99/articles/8bed46fb271e44
Next.jsのISRで動的コンテンツをキャッシュするときの戦略

SSGはrequest時にserver上でrenderingを行うのではなくbuild時に事前にhtmlファイルをpre-rendering（事前描画）しておく

メリット
* パフォーマンス向上
* SEO対応

デメリット
* ページ量が多いwebサイトには向かない（buildが遅くなる）
* 更新頻度の高いサイトには不向き（データ更新ごとに再buildを行う）

SSGとSSRは併用できる
# 1.SSG

静的なコンテンツに使用
Document, Helpなど

# 2.SSG + Pre-fetch

静的なコンテンツを作成する際にデータベースからのデータを埋め込んで作成する（buildするタイミング）
ブログ、商品一覧など

# 3.SSG + Client side fetching

SEOが必要ない場合に使用する
最新データを使用するためにjsでapiを取得して反映する
Todo、Dashboadなど

# 4.SSG + Pre-fetch + Client side fetching

SEOが必要かつ最新データも必要なケース
初期の内容としてbuild時の内容を返しその後apiで取得したデータで上書きする
News siteなど

ただしbuild時に使用されるデータは更新されない
更新したい場合はISRを使用する

## Incremental Static Regeneration(State while revalidation)

html再生成の時間を指定する -> revalidate
※ 再生成が頻繁に行われないためのクールタイム（サーバーの負荷を減らすため）

例: revalidate: 5[s]

build(deploy) → DB update → アクセス　→ revalidate5[s] → 再生成完了

DB update後にアクセスがあった際に新たなデータでhtmlが再生成される
再生成中は古いhtmlを返す、その間新たなhtmlがserverで作成される

サイトにある程度のユーザーからアクセスが頻繁にある前提の技術

Todo, Dashboardなど
