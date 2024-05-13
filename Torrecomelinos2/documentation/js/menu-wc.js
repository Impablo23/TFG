'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">torrecomelinos2 documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-30c4d20ccf45eb2486e8363f09958c914f1e435c9891a1d0c80d5ee610a1e935ed7f8e8d7484539b90375cfab4079cab4f9d037e73b3bf6dd363bcc8356195c5"' : 'data-bs-target="#xs-components-links-module-AppModule-30c4d20ccf45eb2486e8363f09958c914f1e435c9891a1d0c80d5ee610a1e935ed7f8e8d7484539b90375cfab4079cab4f9d037e73b3bf6dd363bcc8356195c5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-30c4d20ccf45eb2486e8363f09958c914f1e435c9891a1d0c80d5ee610a1e935ed7f8e8d7484539b90375cfab4079cab4f9d037e73b3bf6dd363bcc8356195c5"' :
                                            'id="xs-components-links-module-AppModule-30c4d20ccf45eb2486e8363f09958c914f1e435c9891a1d0c80d5ee610a1e935ed7f8e8d7484539b90375cfab4079cab4f9d037e73b3bf6dd363bcc8356195c5"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AuthModule-22bfcbd5807053ae86e117636e98181ac6914366ee90b707b8afb9a5aa479261618fe7ff73ea8c33eb715dc67110415b77281a472d4de4920a09655036740422"' : 'data-bs-target="#xs-components-links-module-AuthModule-22bfcbd5807053ae86e117636e98181ac6914366ee90b707b8afb9a5aa479261618fe7ff73ea8c33eb715dc67110415b77281a472d4de4920a09655036740422"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-22bfcbd5807053ae86e117636e98181ac6914366ee90b707b8afb9a5aa479261618fe7ff73ea8c33eb715dc67110415b77281a472d4de4920a09655036740422"' :
                                            'id="xs-components-links-module-AuthModule-22bfcbd5807053ae86e117636e98181ac6914366ee90b707b8afb9a5aa479261618fe7ff73ea8c33eb715dc67110415b77281a472d4de4920a09655036740422"' }>
                                            <li class="link">
                                                <a href="components/LayoutAuthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutAuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EstablecimientosModule.html" data-type="entity-link" >EstablecimientosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-EstablecimientosModule-6596be5908ce1ec0464795ddabf6aaf3b2cee6e1cd99da2e1dbeec595e4c4d056b8aad0c73ce3d932689cbae0671c526282e4d0e9c3ee4a19008f7daaecfbc81"' : 'data-bs-target="#xs-components-links-module-EstablecimientosModule-6596be5908ce1ec0464795ddabf6aaf3b2cee6e1cd99da2e1dbeec595e4c4d056b8aad0c73ce3d932689cbae0671c526282e4d0e9c3ee4a19008f7daaecfbc81"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EstablecimientosModule-6596be5908ce1ec0464795ddabf6aaf3b2cee6e1cd99da2e1dbeec595e4c4d056b8aad0c73ce3d932689cbae0671c526282e4d0e9c3ee4a19008f7daaecfbc81"' :
                                            'id="xs-components-links-module-EstablecimientosModule-6596be5908ce1ec0464795ddabf6aaf3b2cee6e1cd99da2e1dbeec595e4c4d056b8aad0c73ce3d932689cbae0671c526282e4d0e9c3ee4a19008f7daaecfbc81"' }>
                                            <li class="link">
                                                <a href="components/AddPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeletePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeletePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailsPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DetailsPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FavouritePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FavouritePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SuggestionPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SuggestionPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EstablecimientosRoutingModule.html" data-type="entity-link" >EstablecimientosRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ZonaAdminModule.html" data-type="entity-link" >ZonaAdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ZonaAdminModule-5a1f78feb94d0227cff9d92b6452807704e44764b5dc286f370a1d75f060bca873c0008c728551d727aeda96638f8ae767733b952aa6c82f6b3a30b97e09aabb"' : 'data-bs-target="#xs-components-links-module-ZonaAdminModule-5a1f78feb94d0227cff9d92b6452807704e44764b5dc286f370a1d75f060bca873c0008c728551d727aeda96638f8ae767733b952aa6c82f6b3a30b97e09aabb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ZonaAdminModule-5a1f78feb94d0227cff9d92b6452807704e44764b5dc286f370a1d75f060bca873c0008c728551d727aeda96638f8ae767733b952aa6c82f6b3a30b97e09aabb"' :
                                            'id="xs-components-links-module-ZonaAdminModule-5a1f78feb94d0227cff9d92b6452807704e44764b5dc286f370a1d75f060bca873c0008c728551d727aeda96638f8ae767733b952aa6c82f6b3a30b97e09aabb"' }>
                                            <li class="link">
                                                <a href="components/AddCategoriaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddCategoriaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddSugerenciaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddSugerenciaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddUsuarioComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddZonaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddZonaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoriasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteCategoriaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteCategoriaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteSugerenciaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteSugerenciaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteUsuarioComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteZonaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteZonaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCategoriaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCategoriaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditUsuarioComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditZonaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditZonaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfoSugerenciaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InfoSugerenciaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutAdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistroComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SugerenciasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SugerenciasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsuariosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuariosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ZonasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZonasComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ZonaAdminRoutingModule.html" data-type="entity-link" >ZonaAdminRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthApiService.html" data-type="entity-link" >AuthApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EstablecimientosApiService.html" data-type="entity-link" >EstablecimientosApiService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link" >AuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/HomeGuardService.html" data-type="entity-link" >HomeGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CategoriaApi.html" data-type="entity-link" >CategoriaApi</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EstablecimientoApi.html" data-type="entity-link" >EstablecimientoApi</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FavoritoApi.html" data-type="entity-link" >FavoritoApi</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegistroApi.html" data-type="entity-link" >RegistroApi</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RolApi.html" data-type="entity-link" >RolApi</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SugerenciaApi.html" data-type="entity-link" >SugerenciaApi</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsuarioApi.html" data-type="entity-link" >UsuarioApi</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ZonaApi.html" data-type="entity-link" >ZonaApi</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});