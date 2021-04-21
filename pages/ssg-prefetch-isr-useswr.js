import Link from 'next/link'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import { fetchAllPostData } from '../lib/posts'
import useSWR from 'swr'

//新規データ取得
const fetcher = url => fetch(url).then(res => res.json())
const APIURL = '/json/posts.json'

export default function SsgPrefetch({ posts }) {
  //https://panda-program.com/posts/useswr
  const { data: datas, mutate } = useSWR(APIURL, fetcher, {
    // 初期データ設定
    initialData: posts
  })
  const newdatas = datas
  useEffect(() => {
    // useSWRは第二引数で与えたfetcherが一度取得したデータをクライアント側でキャッシュしするのでマウント時にuseSWRで取得できるキャッシュを最新に
    mutate()
  }, [])
  return (
    <Layout title="SSG + Pre-fetch + Incremental Site Regeneration(ISR) + Client side fetching">
      <h1>
        SSG + Pre-fetch + Incremental Site Regeneration(ISR) + Client side fetching
      </h1>
      <p>HTMLを事前に生成します<br/>
        アクセスがあった際にデータベースの最新データで静的HTMLを作成しなおします<br />
        マウント時に最新データを取得して反映します<br/>
        （活用例：News site）</p>
      <ul class="m-10">
        {
          newdatas ? newdatas.map(item => {
            return (
              <li key={item.id}>
                <Link href={`/ssg-prefetch-isr/${item.id}`}>
                  <div>
                    {item.id} : {item.title}
                  </div>
                </Link>
              </li>
            )
          })
          : <li>記事は存在しません</li>
        }
      </ul>
    </Layout>
  )
}

/*
  必ずserver sideで実行される
  node-fetch build時に呼び出される
  pagesのみで仕様可能
  npm run dev -> リクエストごとに実行（開発環境の挙動）
  npm run start -> ビルド時に実行（本番の挙動）
*/
export async function getStaticProps() {
  const posts = await fetchAllPostData()
  return {
    props: { posts },
    revalidate: 3
  }
}
