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
    
 Fix 1: mergeMap():
 Real case => Get params then get the blog, **this.blogs$ IS USED WITH ASYNC PIPE IN TEMPLATE**
   this.route.params
      .pipe(
        mergeMap(
          (params) => (this.blog$ = this.blogService.getBlogById(params.newsId))
        )
      )
   .subscribe();
