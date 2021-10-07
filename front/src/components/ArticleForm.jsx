import React, { useRef } from 'react'
import { useHistory, useParams } from 'react-router'
import useServiceFetch from '../hooks/useServiceFetch'
import Api from '../services/api'

const ArticleForm = () => {
  const { id } = useParams()
  const { data, error, loading } = useServiceFetch({ service: Api.getArticle.bind(Api), params: [id] })
  const name = useRef()
  const description = useRef()
  const price = useRef()
  const image = useRef()
  const history = useHistory()

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = ({
      name: name.current.value,
      description: description.current.value,
      price: price.current.value,
      image: image.current.value
    })
    await Api.updateArticle(id, payload)
    history.push('/article')
  }
  return (
    <div className="container my-5">
      { loading && <div>Loading...</div> }
      { error && <div>Error: {error.message}</div> }
      { data && data._id && (
        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="username" className="label">Name</label>
            <div className="control">
              <input ref={name} className="input" name="username" defaultValue={data.name}/>
            </div>
          </div>
          <div className="field">
            <label htmlFor="description" className="label">Description</label>
            <div className="control">
              <textarea ref={description} className="input" name="description" defaultValue={data.description}/>
            </div>
          </div>
          <div className="field">
            <label htmlFor="price" className="label">Price</label>
            <div className="control">
              <input ref={price} className="input" name="price" type="number" defaultValue={data.price}/>
            </div>
          </div>
          <div className="field">
            <label htmlFor="price" className="label">Image</label>
            <div className="control">
              <input ref={image} className="input" name="image" type="text" defaultValue={data.image}/>
            </div>
          </div>
          <div className="field">
            <button className="button is-success" type="submit">
              Submit
            </button>
          </div>
        </form>
      ) }
    </div>
  )
}

export default ArticleForm
