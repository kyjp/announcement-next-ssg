import Link from 'next/link'
import {useRouter} from 'next/router'
import Layout from '../../components/Layout'
import { fetchPostData, fetchAllPostIds } from '../../lib/posts'

export default function SsgPrefetch({ post }) {
  const router = useRouter()
  // isFallbackは存在しないデータへアクセスした際にtrueになる
  if (router.isFallback || !post) {
    return (
      <Layout title="SSG + Pre-fetch + Incremental Site Regeneration(ISR)"><div>loading...</div></Layout>
    )
  }
  return (
    <Layout title="SSG + Pre-fetch + Incremental Site Regeneration(ISR)">
      <h1>
        SSG + Pre-fetch + Incremental Site Regeneration(ISR)
      </h1>
      <p>
        HTMLを事前に生成します
        アクセスがあった際にデータベースの最新データで静的HTMLを作成しなおします<br/>
        （活用例：ブログ、商品一覧など）
      </p>
      <div class="m-10">
        <h2>{post.id} : { post.title }</h2>
        <p>{post.body}</p>
        <Link href="/ssg-prefetch"><div className="m-10 text-center">topへ戻る</div></Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await fetchAllPostIds()
  return {
    paths,
    // 存在しないidへのアクセス時の挙動を決める、falseは404、動的な場合はtrueにすると初回アクセス時にファイルが生成される
    fallback: true
  }
}

/*
  必ずserver sideで実行される
  node-fetch build時に呼び出される
  pagesのみで仕様可能
  npm run dev -> リクエストごとに実行（開発環境の挙動）
  npm run start -> ビルド時に実行（本番の挙動）
*/
export async function getStaticProps({ params }) {
  const { post: post } = await fetchPostData(params.id)
  return {
    props: { post },
    // インターバルの指定
    revalidate: 3
  }
}
