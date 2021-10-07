import React from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

const ArticleItem = ({ _id: id, name, description, price, image, isLogged, refetch }) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image ?? "https://bulma.io/images/placeholders/1280x960.png"} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{name}</p>
            <p className="subtitle is-6">{price} €</p>
          </div>
        </div>

        <div className="content">
          {description}
          <br />
          {isLogged && (
            <>
            <Link to={`/article/edit/${id}`} className="button is-primary">
              edit
            </Link>
            <a onClick={async () => {
              await api.deleteArticle(id),
              await refetch()
            }} className="button is-danger">delete</a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticleItem
