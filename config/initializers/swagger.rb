GrapeSwaggerRails.options.url      = '/api/documentation'
GrapeSwaggerRails.options.before_filter_proc = proc {
  GrapeSwaggerRails.options.app_url = request.protocol + request.host_with_port
}
GrapeSwaggerRails.options.app_name = 'Export API'
GrapeSwaggerRails.options.doc_expansion = 'list'
