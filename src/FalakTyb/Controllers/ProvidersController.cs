using MediatR;
using System.Collections.Generic;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using awqaf.Domain;
using awqaf.Crosscutting.Exceptions;
using awqaf.Web.Extensions;
using awqaf.Web.Filters;
using awqaf.Web.Rest.Utilities;
using awqaf.Application.Queries;
using awqaf.Application.Commands;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace awqaf.Controllers
{
    [Authorize]
    [Route("api/providers")]
    [ApiController]
    public class ProvidersController : ControllerBase
    {
        private const string EntityName = "providers";
        private readonly ILogger<ProvidersController> _log;
        private readonly IMediator _mediator;

        public ProvidersController(ILogger<ProvidersController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Providers>> CreateProviders([FromBody] Providers providers)
        {
            _log.LogDebug($"REST request to save Providers : {providers}");
            if (providers.Id != 0)
                throw new BadRequestAlertException("A new providers cannot already have an ID", EntityName, "idexists");
            providers = await _mediator.Send(new ProvidersCreateCommand { Providers = providers });
            return CreatedAtAction(nameof(GetProviders), new { id = providers.Id }, providers)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, providers.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateProviders(long id, [FromBody] Providers providers)
        {
            _log.LogDebug($"REST request to update Providers : {providers}");
            if (providers.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != providers.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            providers = await _mediator.Send(new ProvidersUpdateCommand { Providers = providers });
            return Ok(providers)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, providers.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Providers>>> GetAllProviders(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Providers");
            var result = await _mediator.Send(new ProvidersGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }



[HttpGet("/get/all/serviceOfferProvider")]
        public async Task<ActionResult<IEnumerable<Providers>>> GetAllProvidersMap(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Providers");
            var result = await _mediator.Send(new ProvidersGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }
        // here code for search provider by categoryId for mobile app
        [HttpGet("/get/all/serviceOfferProvider/{categoryId}")]

        public async Task<ActionResult<IEnumerable<Providers>>> GetAllProvidersByCategory(long categoryId, IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Providers");
            var result = await _mediator.Send(new ProvidersGetAllByCategoryIdQuery { CategoryId = categoryId, Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        // get nearest provider by lat and lng
        [HttpGet("/get/all/serviceOfferProvider/nearby/employee/mobile/{latitude}/{longitude}/{categoryId}/{radius}")]

        public async Task<ActionResult<IEnumerable<Providers>>> GetAllProvidersNearby(double latitude, double longitude, long categoryId, int radius, IPageable pageable)
        {
            _log.LogDebug("REST request to get  nearest provider by lat and lng");
            var result = await _mediator.Send(new ProvidersGetAllNearByQuery { Latitude = latitude, Longitude = longitude, CategoryId = categoryId, Radius = radius, Page = pageable });
            return Ok(result);
        }






        //get all vip provider



        [HttpGet("/get/all/serviceOfferProvider/vip")]

        public async Task<ActionResult<IEnumerable<Providers>>> GetAllProvidersVip(IPageable pageable)
        {
            _log.LogDebug("REST request to get  all vip provider");
            var result = await _mediator.Send(new ProvidersGetAllVipQuery { });
            return Ok(result);
        }






        // get all providers by main provider id
        [HttpGet("/get/all/serviceOfferProvider/main/provider/{mainProviderId}")]
        public async Task<ActionResult<IEnumerable<Providers>>> GetAllProvidersByMainProviderId(long mainProviderId, IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Providers");
            var result = await _mediator.Send(new ProvidersGetAllByMainProviderIdQuery { MainProviderId = mainProviderId });
            return Ok(result);
        }




        // here code for search provider by categoryId for mobile app
        [HttpGet("/get/all/serviceOfferProvider/holdingcompany/{categoryId}")]

        public async Task<ActionResult<IEnumerable<HoldingCompanyInfo>>> GetAllProvidersByCategoryIdHoldingCompany(long categoryId, IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Providers");
            var result = await _mediator.Send(new ProvidersGetAllByByCategoryIdHoldingCompanyQuery { CategoryId = categoryId });
            return Ok(result);
        }


// search for provider near by by word


[HttpGet("/get/all/serviceOfferProvider/nearby/employee/mobile/search/{words}/{latitude}/{longitude}/{categoryId}/{radius}")]

        public async Task<ActionResult<IEnumerable<Providers>>> searchProvidersNearbyAndWords(double latitude, double longitude, long categoryId, int radius, string words,IPageable pageable)
        {
            _log.LogDebug("REST request to get  nearest provider by lat and lng");
            var result = await _mediator.Send(new searchProvidersNearbyAndWordsQuery { Latitude = latitude, Longitude = longitude, CategoryId = categoryId, Radius = radius, Words = words ,Page = pageable });
            return Ok(result);
        }


        // here to search about provider by providername 


        [HttpGet("/get/all/serviceOfferProvider/search/{words}")]

        public async Task<ActionResult<searchResults>> Search(string words, IPageable pageable)
        {


            _log.LogDebug("REST Search all");
            var result = await _mediator.Send(new SearchByWordsQuery { Words = words });
            return Ok(result);
        }


        // here to search about provider by providername and categoryId
        [HttpGet("/get/all/serviceOfferProvider/{categoryId}/{words}")]
        public async Task<ActionResult<IEnumerable<Providers>>> SearchProviderByWords(string words, long categoryId, IPageable pageable)
        {


            _log.LogDebug("REST Search Provider By Provider Name Query");
            var result = await _mediator.Send(new SearchProviderByWordsQuery { Words = words, CategoryId = categoryId });
            return Ok(result);
        }




        // here search for sub provider by main provider id and words
        [HttpGet("/get/all/serviceOfferProvider/main/provider/{mainId}/{words}")]

        public async Task<ActionResult<IEnumerable<Providers>>> SearchProviderByMainProviderIdAndWords(string words, long mainId, IPageable pageable)
        {


            _log.LogDebug("REST Search Provider By Provider Name Query");
            var result = await _mediator.Send(new SearchProviderByMainProviderIdAndWordsQuery { Words = words, MainId = mainId });
            return Ok(result);
        }



        // here to search about holding provider by providername 


        [HttpGet("/get/all/serviceOfferProvider/search/holding/{words}")]

        public async Task<ActionResult<IEnumerable<HoldingCompanyInfo>>> SearchProviderHoldingCompanyByWords(string words, IPageable pageable)
        {
            _log.LogDebug("REST Search Provider By Provider Name Query");
            var result = await _mediator.Send(new SearchProviderHoldingCompanyByWordsQuery { Words = words });
            return Ok(result);
        }


        //generic return type












        [HttpGet("{id}")]
        public async Task<IActionResult> GetProviders([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Providers : {id}");
            var result = await _mediator.Send(new ProvidersGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProviders([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Providers : {id}");
            await _mediator.Send(new ProvidersDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }









}