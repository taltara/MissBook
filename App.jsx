const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
const history = History.createBrowserHistory();

import { Home } from 'pages/Home.jsx';
import { BookApp } from 'pages/BookApp.jsx';
import { BookDetails } from 'pages/BookDetails.jsx';
import { NavBar } from 'cmps/NavBar.jsx';
import { About } from 'pages/About.jsx';

// import { CSSTransition, TransitionGroup } from 'lib/react-transition-group.js';

export class App extends React.Component {

    render() {
        return (
            <Router>
                <NavBar></NavBar>
                <div>
                    {/* <Route render={({match}) => ( */}

                        {/* // <TransitionGroup> */}
                            {/* // <CSSTransition */}
                                {/* // key={location.key}
                                // timeout={300}
                                // classNames="container"
                                // in={match != null}
                            >  */}
                                <Switch>
                                    <Route history={history} component={BookDetails} path="/books/:bookName/:bookId" />
                                    <Route component={BookApp} path="/books" />
                                    <Route component={About} path="/about" />
                                    <Route component={Home} path="/" />
                                </Switch>
                            {/* // </CSSTransition>
                        // </TransitionGroup> */}

                    {/* //  )} /> */}


                </div>
            </Router>
        )
    }
}

