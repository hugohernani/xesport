class Entry < ActiveRecord::Base
  extend FriendlyId, EnumerateIt
  is_impressionable
  friendly_id :slug_candidates, use: [:slugged, :finders]

  belongs_to :user, polymorphic: true
  belongs_to :category
  has_many :assets, dependent: :destroy, foreign_key: 'owner_id'

  validates :title, presence: true

  accepts_nested_attributes_for :assets, :reject_if => lambda { |a| a['asset'].nil? }
  accepts_nested_attributes_for :category

  has_enumeration_for :status, with: ::EntryStatus,
    create_scopes: true, create_helpers: true

  default_scope { includes(:assets, :category) }
  scope :order_by_content_class, -> { order(type: :desc) }
  scope :each_type, -> {group(:id, :type)}
  scope :by_type, ->(type_param) { where(type: type_param) }

  def self.by_impressions_grouping
    includes(:impressions).where(impressions: { impressionable_type: self }).
      group(:id, 'assets.id', 'categories.id', 'impressions.id', 'impressions.impressionable_id').order('count(*)')
  end

  protected
  def self.content_attr(attr_name, attr_type = :string)
    content_attributes[attr_name] = attr_type
    store_accessor :payload, attr_name
  end

  def self.content_attributes
    @content_attributes ||= {}
  end

  def slug_candidates
    [
      [:title],
      [:id]
    ]
  end
end
