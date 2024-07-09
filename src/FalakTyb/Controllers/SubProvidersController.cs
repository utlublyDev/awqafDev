
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
    [Route("api/sub-providers")]
    [ApiController]
    public class SubProvidersController : ControllerBase
    {
        private const string EntityName = "subProviders";
        private readonly ILogger<SubProvidersController> _log;
        private readonly IMediator _mediator;

        public SubProvidersController(ILogger<SubProvidersController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<SubProviders>> CreateSubProviders([FromBody] SubProviders subProviders)
        {
            _log.LogDebug($"REST request to save SubProviders : {subProviders}");
            if (subProviders.Id != 0)
                throw new BadRequestAlertException("A new subProviders cannot already have an ID", EntityName, "idexists");
            subProviders = await _mediator.Send(new SubProvidersCreateCommand { SubProviders = subProviders });
            return CreatedAtAction(nameof(GetSubProviders), new { id = subProviders.Id }, subProviders)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, subProviders.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateSubProviders(long id, [FromBody] SubProviders subProviders)
        {
            _log.LogDebug($"REST request to update SubProviders : {subProviders}");
            if (subProviders.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != subProviders.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            subProviders = await _mediator.Send(new SubProvidersUpdateCommand { SubProviders = subProviders });
            return Ok(subProviders)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, subProviders.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubProviders>>> GetAllSubProviders(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of SubProviders");
            var result = await _mediator.Send(new SubProvidersGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubProviders([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get SubProviders : {id}");
            var result = await _mediator.Send(new SubProvidersGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubProviders([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete SubProviders : {id}");
            await _mediator.Send(new SubProvidersDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
