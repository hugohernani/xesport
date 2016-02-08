class CreateAssets < ActiveRecord::Migration
  def change
    create_table :assets do |t|
      t.references :owner, polymorphic: true, index: true
      t.attachment :file

      t.timestamps null: false
    end
  end
end
