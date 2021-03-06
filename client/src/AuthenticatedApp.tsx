import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MainTemplate } from './templates/MainTemplate';
import { Home } from './pages/Home';
import { Repos } from './pages/Repos';
import { TransferIssues } from './pages/TransferIssues';

export const AuthenticatedApp = () => {
  return (
    <Router>
      <Switch>
        <MainTemplate>
          <Route exact path="/" component={Home} />
          <Route path="/repos" component={Repos} />
          <Route path="/transfer" component={TransferIssues} />
        </MainTemplate>
      </Switch>
    </Router>
  );
};
