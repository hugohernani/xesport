module RequestMacros
  def default_headers(api_token)
    {
      "Content-type"       => Mime::JSON.to_s,
      "Accept"             => Mime::JSON.to_s,
      'HTTP_AUTHORIZATION' => ActionController::HttpAuthentication::Token.encode_credentials(api_token)
    }
  end

  def json(response)
    JSON.parse(response.body)
  end
end
