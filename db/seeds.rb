module Seeds

  first_category = FactoryGirl.create(:category, name: "Luta")
  4.times do
    FactoryGirl.create(:portfolio, asset_count: 2, category: first_category)
  end

  second_category = FactoryGirl.create(:category, name: 'Anúncios')
  4.times do
    FactoryGirl.create(:ad, asset_count: 1, asset_ads: true, category: second_category)
  end

  third_category = FactoryGirl.create(:category, name: 'Jiu Jitsu', parent: first_category)
  10.times do
    FactoryGirl.create(:post, category: third_category)
  end

  FactoryGirl.create(:video, link: 'https://www.youtube.com/embed/BrZvktjEWAY')
end
