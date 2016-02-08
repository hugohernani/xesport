include ActionDispatch::TestProcess

FactoryGirl.define do
  factory :asset do
    file { fixture_file_upload( "#{Rails.root}/app/assets/images/content/600/#{Random.rand(1..12)}.jpg", "image/jpg")}

    trait :ad do
      file { fixture_file_upload( "#{Rails.root}/app/assets/images/ads/180x180.png", "image/png")}
    end
    
  end
end
