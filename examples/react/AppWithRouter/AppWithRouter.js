import React, { Fragment } from 'react'
import { withRouter } from 'react-router'
import { Link, Route, Router, Switch } from 'react-router-dom'

const ComponentWithRouter = withRouter(({ location: { pathname } }) => (
  <h1 data-test="with-router">You are now at { pathname }</h1>
))

const Home = () => <h1>Wellcome to shopping online</h1>
const MyProducts = () => <h1>This is the list of products you usually buy</h1>
const NotFound = () => <h1>404 page not found</h1>

const AppWithRouter = () => (
  <Fragment>
    <Link to="/">Home</Link>
    <Link to="/my-products">My Products</Link>
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/my-products" component={ MyProducts } />
      <Route component={ NotFound } />
    </Switch>
    <ComponentWithRouter />
  </Fragment>
)

export { AppWithRouter }