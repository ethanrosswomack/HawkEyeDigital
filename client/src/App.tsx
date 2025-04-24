import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AlbumDetails from "./pages/AlbumDetails";
import Lyrics from "./pages/Lyrics";
import Vision from "./pages/Vision";
import Merch from "./pages/Merch";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/album/:id" component={AlbumDetails} />
      <Route path="/lyrics" component={Lyrics} />
      <Route path="/vision" component={Vision} />
      <Route path="/merch" component={Merch} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Layout>
        <Router />
      </Layout>
    </TooltipProvider>
  );
}

export default App;
