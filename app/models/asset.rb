class Asset < ActiveRecord::Base
  IMAGE_CONTENT_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/gif"]
  belongs_to :owner, polymorphic: true

  has_attached_file :file, styles: lambda{ |a| IMAGE_CONTENT_TYPES.include?( a.content_type ) ? {
                           thumb: "100x100>", small: "150x150>", medium: "300x300>", large: "500x500>",
                           ads: "180x180>" } : {} }

  validates_attachment_presence :file
  validates_attachment_content_type :file, content_type: IMAGE_CONTENT_TYPES
  validates_attachment_file_name :file, matches: [/png\Z/, /jpe?g\Z/, /gif\Z/]
  validates_attachment_size :file, :less_than => 5.megabytes

  protected

  def dynamic_file_name
    [/png\Z/, /jpe?g\Z/, /gif\Z/]
  end

  def dynamic_content_type
    IMAGE_CONTENT_TYPES
  end
end
