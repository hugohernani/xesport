FactoryGirl.define do
  factory :portfolio, parent: :entry do
    type Portfolio
    transient do
      asset_count 3
    end

    after(:create) do |portfolio, evaluator|
      create_list(:asset, evaluator.asset_count, owner: portfolio)
    end
  end
end
