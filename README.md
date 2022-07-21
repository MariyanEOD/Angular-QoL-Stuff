# Angular-QoL-Stuff
Animations, CSS&amp;HTML Templates and stuff

How to avoid nested subscription trap
Example:
Observable1.subscribe(B => { 
  Observable2.subscribe(A => {
  ...
    }
    ...
    ))
    
 Fix 1: ```mergeMap()```
 Real case => Get params then get the blog, **this.blogs$ IS USED WITH ASYNC PIPE IN TEMPLATE**
   ```ts
    this.params$ = this.route.params.pipe(
      mergeMap((params) => {
        return this.blogService.getBlogById(params.newsId).pipe(
          mergeMap((blog: IBlog) => {
            this.blog = blog;
            return this.blogService.getRelatedNews(blog.tags);
          })
        );
      })
    );
   ```
