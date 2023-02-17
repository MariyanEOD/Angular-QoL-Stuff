# Android QoL code snippets

# Folder structure examples
https://github.com/mdali602/angular-folder-structure


# concatMap vs switchMap vs mergeMap vs exhaustMap

https://offering.solutions/blog/articles/2021/03/08/switchmap-mergemap-concatmap-exhaustmap-explained/

1. Text zoom disable
```java
<!-- MainActivity.java -->
import com.getcapacitor.BridgeActivity;
import android.webkit.WebSettings;
import android.webkit.WebView;
public class MainActivity extends BridgeActivity {
  public void onResume() {
    super.onResume();
    WebSettings settings = bridge.getWebView().getSettings();
    settings.setTextZoom(1000);
    settings.setSupportZoom(false);
  }
}
```
2. Native Dark Mode disable
```java
import com.getcapacitor.BridgeActivity;
import android.webkit.WebSettings;
import android.webkit.WebView;
public class MainActivity extends BridgeActivity {
  public void onResume() {
    super.onResume();
    WebSettings settings = bridge.getWebView().getSettings();
    settings.setForceDark(WebSettings.FORCE_DARK_OFF);
  }
}
```

# Angular-animatinos QoL library
https://github.com/filipows/angular-animations


# Git commands
1. Merging a newer branch into old while accepting the Incoming Changes
```
git checkout --theirs .
git add .
```
2. Mergin a newer branch into old while accepting Current Changes
```
git checkout --ours .
git add .
```

# Spinners

https://loading.io/css/

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



Working order
1. Subscribe to search form control valueChanges 
2. Start with empty string
3. Add 300 seconds delay, so it does not lag
4. SwitchMap which will return another observable
5. Pass formControls to `of()` observable
6. `of()` will map once the array 
7. In map function, formArr will be filtered
8. Each `formGroup` will be checked if X property includes the `searchString`
9. if it is included, returns it, otherwise do not return it




component.ts
```ts
  form: FormGroup;
  search = new FormControl();
  searchProperty = 'name';
  searchKeys = ['name', 'surname', 'email']
  searchResults$: Observable<any>;
    get f() {
    return this.form.get('FORM_ARRAY_NAME') as FormArray;
  }
    get fcontrols() {
    return this.f.controls as FormGroup[];
    }
 
    ngOnInit() { 
        this.form = this.fb.group({
          FORM_ARRAY_NAME: this.fb.array(
            this.YOUR_ARRAY_DATA.map((x, i) => {
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
            /* Multi-key searching
         for (const key of this.searchKeys) {
                if (
                  group.get(key).value.toLowerCase().includes(val.toLowerCase())
                ) {
                  return group;
                }
              }
              */
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
https://alvarotrigo.com/blog/javascript-menus/
https://blog.hubspot.com/website/css-animation-examples

##** Passing a callback to another component
```diff
- callback(..args) { return console.log(args) }
+ callback = (..args) => console.log(args)
```
# Regex

`/^[^.]+$|\.(?!(svg)$)([^.]+$)/g` => Filters strings with .svg extension (useful for network tab with dynamically loading svgs for light/dark customization)

`[0-9]+` => Find all numbers in file
`'(.*);` => Find all text between ' and '
`console\.log\(([^)]+)\);` console.log regex
