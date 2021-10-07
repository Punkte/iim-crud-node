import React from 'react'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import useServiceFetch from '../hooks/useServiceFetch'
import Api from '../services/api'
import { AuthContext } from '../store/AuthStore'
import ArticleForm from './ArticleForm'
import ArticleItem from './ArticleItem'

const ArticleList = () => {
  const { data, error, isLoading, refetch } = useServiceFetch({ service: Api.getArticles.bind(Api), params: [] })
  const { isLogged } = React.useContext(AuthContext)
  return (
    <div className="container">
      { isLoading && <p>Loading...</p> }
      { data && data.error && <pre>{data.error?.message ?? 'error'}</pre> }
      <div className="columns is-multiline">
      { data && data.length && data.map(article => (
        <div className="column is-one-quarter" key={article._id}>
          <ArticleItem  {...article} isLogged={isLogged} refetch={refetch} />
        </div>
      )) }
      <div className="column is-one-quarter">
        <Link to="/article/add" className=" is-flex is-align-items-stretch is-clickable">
          <div className="has-background-light is-flex is-justify-content-center is-align-items-center px-6 h100">
            <div className="fa fa-plus"></div>
            <p>Ajouter</p>
          </div>
        </Link>
      </div>
      </div>
    </div>
  )
}

export default ArticleList
