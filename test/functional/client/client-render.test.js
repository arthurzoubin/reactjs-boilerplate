import { Main } from 'app/main'
import { history } from 'app/composition/history'
import App from 'app/components/App/App'
import fetchMock from 'fetch-mock'

describe('Client Render', function() {
  before(()=> {
    history.push('/')
  })

  const barResponse = [ 'some', 'test', 'response', 'data' ]

  beforeEach(()=> {
    fetchMock.get('/api/bar', {
      status: 200,
      body: { bar: barResponse },
      headers:  {
        'Content-Type': 'application/json',
        'Content-Length': '1',
      },
    })
    this.wrapper = mount(Main)
  })

  afterEach(()=> {
    this.wrapper.unmount()
    fetchMock.restore()
  })

  it('should render the app', ()=> {
    expect(this.wrapper.find(App)).to.have.length(1)
  })

  it('should set the page title', ()=> {
    expect(document.title).to.eql('Reactjs Base')
  })

  it('should set the meta description and chartset', ()=> {
    const metaCharset = document.querySelector('meta[charset]')
    expect(metaCharset.getAttribute('charset')).to.eql('utf-8')
    const metaDesc = document.querySelector('meta[name=description]')
    expect(metaDesc.getAttribute('content')).to.contain('Reactjs Base')
  })

  describe('Routes', ()=> {
    describe('/oops', ()=> {
      it('should render the OopsRoute after navigating to /oops', ()=> {
        expect(this.wrapper.find('.OopsRoute')).to.have.length(0)
        history.push('/oops')
        expect(this.wrapper.find('.OopsRoute')).to.have.length(1)
      })
    })

    describe('404', ()=> {
      it('should render the 404 route when no match found', ()=> {
        history.push('/no-match-found')
        expect(this.wrapper.find('.NotFoundRoute')).to.have.length(1)
      })
    })
  })
})
