import fetch from 'node-fetch'

const APIURL = 'https://jsonplaceholder.typicode.com/posts'

export async function fetchAllPostData() {
  const res = await fetch(new URL('http://127.0.0.1:8080/json/posts.json'))
  const posts = await res.json()
  return posts
}

export async function fetchAllPostIds() {
  const res = await fetch(new URL('http://127.0.0.1:8080/json/posts.json'))
  const posts = await res.json()
  return posts.map(post => {
    return {
      // 必ずparamsをつける必要がある
      params: {
        id: String(post.id)
      }
    }
  })
}

export async function fetchPostData(id) {
  const res = await fetch(new URL(`http://127.0.0.1:8080/json/posts/${id}.json`))
  const post = await res.json()
  return {
    post
  }
}
