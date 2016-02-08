FactoryGirl.define do
  factory :video do
    title { Faker::Name.title }
    link { 'https://www.youtube.com/watch?v=9C_BrHfcU3I' }
    type Video
  end
end
