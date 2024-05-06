var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"auth","loadChildren":"./auth/auth.module#AuthModule","canActivate":["HomeGuardService"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/auth/auth-routing.module.ts","module":"AuthRoutingModule","children":[{"path":"","component":"LayoutAuthComponent","children":[{"path":"login","component":"LoginPageComponent"},{"path":"register","component":"RegisterPageComponent"},{"path":"**","redirectTo":"login"}]}],"kind":"module"}],"module":"AuthModule"}]},{"path":"establecimientos","loadChildren":"./establecimientos/establecimientos.module#EstablecimientosModule","canActivate":["AuthGuardService"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/establecimientos/establecimientos-routing.module.ts","module":"EstablecimientosRoutingModule","children":[{"path":"","component":"LayoutPageComponent","children":[{"path":"list","component":"ListPageComponent"},{"path":"search","component":"SearchPageComponent"},{"path":"add","component":"AddPageComponent","canActivate":["AdminGuard"]},{"path":"favourite-list","component":"FavouritePageComponent"},{"path":"suggestions","component":"SuggestionPageComponent"},{"path":"details/:id","component":"DetailsPageComponent"},{"path":"delete/:id","component":"DeletePageComponent","canActivate":["AdminGuard"]},{"path":"edit/:id","component":"EditPageComponent","canActivate":["AdminGuard"]},{"path":"**","redirectTo":"list"}]}],"kind":"module"}],"module":"EstablecimientosModule"}]},{"path":"admin","loadChildren":"./zona-admin/zona-admin.module#ZonaAdminModule","canActivate":["AdminGuard"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/zona-admin/zona-admin-routing.module.ts","module":"ZonaAdminRoutingModule","children":[{"path":"","component":"LayoutAdminComponent","children":[{"path":"zonas","component":"ZonasComponent","children":[{"path":"","component":"AddZonaComponent"},{"path":"edit/:id","component":"EditZonaComponent"},{"path":"delete/:id","component":"DeleteZonaComponent"}]},{"path":"categorias","component":"CategoriasComponent","children":[{"path":"","component":"AddCategoriaComponent"},{"path":"edit/:id","component":"EditCategoriaComponent"},{"path":"delete/:id","component":"DeleteCategoriaComponent"}]},{"path":"usuarios","component":"UsuariosComponent","children":[{"path":"","component":"AddUsuarioComponent"},{"path":"edit/:id","component":"EditUsuarioComponent"},{"path":"delete/:id","component":"DeleteUsuarioComponent"}]},{"path":"sugerencias","component":"SugerenciasComponent","children":[{"path":"","component":"InfoSugerenciaComponent"},{"path":"add/:id","component":"AddSugerenciaComponent"},{"path":"delete/:id","component":"DeleteSugerenciaComponent"}]},{"path":"registro","component":"RegistroComponent"},{"path":"**","redirectTo":"zonas"}]}],"kind":"module"}],"module":"ZonaAdminModule"}]},{"path":"","redirectTo":"auth","pathMatch":"full"},{"path":"**","redirectTo":"auth"}],"kind":"module"}]}
