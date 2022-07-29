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


## **Search function with FormGroup && FormArray** ##

component.ts
```ts
  form: FormGroup;
  search = new FormControl();
  searchProperty = 'name';
  searchResults$: Observable<any>;
  
    get fcontrols() {
    return this.f.controls as FormGroup[];
    }
 
    ngOnInit() { 
        this.form = this.fb.group({
          FORM_ARRAY_NAME: this.fb.array(
            this.users.map((x, i) => {
             return this.fb.group(x);
        })
      ),
    });

     this.searchResults$ = this.search.valueChanges.pipe(
      tap((x) => console.log(x)),
      startWith(''),
      debounceTime(300),
      switchMap((val: string) => {
        return of(this.fcontrols as AbstractControl[]).pipe(
          map((formArr: AbstractControl[]) =>
            formArr.filter((group: AbstractControl) => {
              console.log(this.searchProperty);
              return group
                .get(this.searchProperty) // A simple string: name | email | phone
                .value.toLowerCase()
                .includes(val.toLowerCase());
            })
          )
        );
      })
    );
    }
```
template.html
```html
<div class="main-form-container" [formGroup]="form">
   <input [formControl]="search" type="text" />  <!-- Can be inside or outside formGroup -->
   <div class="form-array-container" formArrayName="FORM_ARRAY_NAME">
      <div
         class="search-results-as-formGroups"
         *ngFor="let formGroup of searchResults$ | async; let i = index"
         [formGroup]="formGroup">
         <input formControlName="username" />  <!-- Your formControls of each formGroup -->
      </div>
   </div>
</div>

```
Neat CSS Cards
https://www.sliderrevolution.com/resources/css-cards/


