class EntryPresenter < SimpleDelegator
  def self.decorate_collection(entries)
    entries.map { |e| new(e) }
  end

  def object
    __getobj__
  end

  def images
    content_types = ["image/jpeg", "image/png", "image/jpg", "image/gif"]
    object.assets.select{ |a| content_types.include?(a.file.content_type) }
  end

  def description
    object.respond_to?(:description) ? object.description : false
  end

  def date
    nil
  end
end
