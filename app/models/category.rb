class Category < ActiveRecord::Base
  belongs_to :parent, polymorphic: true

  has_many :entries
  has_many :categories, foreign_key: 'parent_id'

  def self.parent_categories
    where(parent_id: nil)
  end

end
