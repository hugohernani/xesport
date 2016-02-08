RSpec.configure do |config|
  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
  end

  config.after(:suite) do
    %w(CompanyRepository ConsumerRepository UserRepository).each do |repository|
      "Es::#{ repository }".constantize.new.delete_index! rescue ''
    end
  end

  config.before(:each) do |example|
    DatabaseCleaner.strategy = example.metadata[:js] ? :truncation : :transaction
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end
end
