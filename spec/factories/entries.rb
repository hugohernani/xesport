FactoryGirl.define do
  factory :entry do
    title { Faker::Name.title }
    status 1
  end
end
