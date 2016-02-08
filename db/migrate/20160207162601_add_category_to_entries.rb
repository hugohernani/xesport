class AddCategoryToEntries < ActiveRecord::Migration
  def change
    add_reference :entries, :category, index: true, foreign_key: true
  end
end
