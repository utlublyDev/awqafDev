
using MediatR;
using System.Threading;
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
using Microsoft.EntityFrameworkCore;

namespace awqaf.Controllers
{
    [Authorize]
    [Route("api/saved-providers")]
    [ApiController]
    public class SavedProvidersController : ControllerBase
    {
        private const string EntityName = "savedProviders";
        private readonly ILogger<SavedProvidersController> _log;
        private readonly IMediator _mediator;

        public SavedProvidersController(ILogger<SavedProvidersController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<SavedProviders>> CreateSavedProviders([FromBody] SavedProviders savedProviders)
        {
            _log.LogDebug($"REST request to save SavedProviders : {savedProviders}");
            if (savedProviders.Id != 0)
                throw new BadRequestAlertException("A new savedProviders cannot already have an ID", EntityName, "idexists");
            savedProviders = await _mediator.Send(new SavedProvidersCreateCommand { SavedProviders = savedProviders });
            return CreatedAtAction(nameof(GetSavedProviders), new { id = savedProviders.Id }, savedProviders)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, savedProviders.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateSavedProviders(long id, [FromBody] SavedProviders savedProviders)
        {
            _log.LogDebug($"REST request to update SavedProviders : {savedProviders}");
            if (savedProviders.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != savedProviders.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            savedProviders = await _mediator.Send(new SavedProvidersUpdateCommand { SavedProviders = savedProviders });
            return Ok(savedProviders)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, savedProviders.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SavedProviders>>> GetAllSavedProviders(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of SavedProviders");
            var result = await _mediator.Send(new SavedProvidersGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }
        //get all providers that saved from user id

        [HttpGet("get/all/employee/mobile/provider/{userId}")]
        public async Task<ActionResult<IEnumerable<Providers>>> GetAllSavedProvidersByUserIdProvider(string userId, IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of SavedProviders");
            var result = await _mediator.Send(new SavedProvidersGetAllByUserIdProviderQuery { UserId = userId, Page = pageable });
            return Ok(result);
        }



        //get all offer that saved from user id

        [HttpGet("get/all/employee/mobile/offer/{userId}")]
        public async Task<ActionResult<IEnumerable<Offers>>> GetAllSavedProvidersByUserIdOffer(string userId, IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of SavedProviders");
            var result = await _mediator.Send(new SavedProvidersGetAllByUserIdOffersQuery { UserId = userId, Page = pageable });
            return Ok(result);
        }






        //get all offer that saved from user id

        [HttpGet("get/all/employee/mobile/allsaved/{userId}")]
        public async Task<ActionResult<SavedResults>> GetAllSavedByUserId(string userId, IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of SavedProviders");
            var result = await _mediator.Send(new SavedGetAllByUserIdQuery { UserId = userId, Page = pageable });
            return Ok(result);




        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetSavedProviders([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get SavedProviders : {id}");
            var result = await _mediator.Send(new SavedProvidersGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}/{awaqafUserId}")]
        public async Task<IActionResult> DeleteSavedProviders([FromRoute] long id,[FromRoute] string awaqafUserId)
        {
            _log.LogDebug($"REST request to delete SavedProviders : {id}");
            await _mediator.Send(new SavedProvidersDeleteCommand { Id = id ,AwaqafUserId = awaqafUserId});
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
