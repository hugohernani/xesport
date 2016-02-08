require 'grape-swagger'

module API
  module V1
    class Root < Grape::API
      add_swagger_documentation(
        format: :json,
        api_version: "v1",
        mount_path: "/api/documentation",
        hide_format: true,
        hide_documentation_path: true,
        base_path: '/'
      )
    end
  end
end
