require 'rails_helper'

shared_context 'stub devise' do
  before do
    allow(request.env['warden']).to receive(:authenticate!) { current_user }
    allow(controller).to receive(:current_user) { current_user }
  end
end
