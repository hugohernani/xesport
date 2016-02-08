FactoryGirl.define do
  factory :post, parent: :entry do
    type Post
    transient do
      asset_count 0
    end

    after(:create) do |portfolio, evaluator|
      create_list(:asset, evaluator.asset_count, owner: portfolio) if evaluator.asset_count > 0
    end
  end
end
