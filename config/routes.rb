Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#index'

  # mount API::Root => '/'
  # mount GrapeSwaggerRails::Engine => '/documentation'

  resources :static_pages

end
