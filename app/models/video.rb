class Video < Entry
  content_attr :link, :string

  validates :link, presence: true
end
