module FeatureMacros
  def sign_in_as(user)
    visit new_user_session_path

    fill_in "Email", with: user.email, :match => :first
    fill_in "Password", with: user.password, :match => :first

    click_button "login"
  end
end
