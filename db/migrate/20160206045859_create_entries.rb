class CreateEntries < ActiveRecord::Migration
  def change
    create_table :entries do |t|
      t.string :title
      t.string :type, index: true
      t.string :slug, index: true
      t.integer :status
      t.json :payload
      t.references :user, polymorphic: true, index: true
      t.string :author_name
      t.datetime :published_at

      t.timestamps null: false
    end
  end
end
