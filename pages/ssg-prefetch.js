import Link from 'next/link'
import Layout from '../components/Layout'
import {fetchAllPostData} from '../lib/posts'

export default function SsgPrefetch({ posts }) {
  return (
    <Layout title="SSG + Pre-fetch">
      <h1>
        SSG + Pre-fetch
      </h1>
      <p>HTMLを事前に生成します</p>
      <ul class="m-10">
        {
          posts ? posts.map(item => {
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
    props: { posts }
  }
}
