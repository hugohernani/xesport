FactoryGirl.define do
  factory :ad, parent: :entry do
    type Ad
    transient do
      asset_count 3
      asset_ads false
    end

    after(:create) do |portfolio, evaluator|
      if evaluator.asset_ads
        create_list(:asset, evaluator.asset_count, :ad, owner: portfolio)
      else
        create_list(:asset, evaluator.asset_count, owner: portfolio)
      end
    end
  end
end
