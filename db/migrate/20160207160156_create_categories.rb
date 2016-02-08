class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name
      t.references :parent, polymorphic: true, index: true

      t.timestamps null: false
    end
  end
end
