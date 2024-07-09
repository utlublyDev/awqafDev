
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
    [Route("api/push-notifications")]
    [ApiController]
    public class PushNotificationsController : ControllerBase
    {
        private const string EntityName = "pushNotifications";
        private readonly ILogger<PushNotificationsController> _log;
        private readonly IMediator _mediator;

        public PushNotificationsController(ILogger<PushNotificationsController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<PushNotifications>> CreatePushNotifications([FromBody] PushNotifications pushNotifications)
        {
            _log.LogDebug($"REST request to save PushNotifications : {pushNotifications}");
            if (pushNotifications.Id != 0)
                throw new BadRequestAlertException("A new pushNotifications cannot already have an ID", EntityName, "idexists");
            pushNotifications = await _mediator.Send(new PushNotificationsCreateCommand { PushNotifications = pushNotifications });
            return CreatedAtAction(nameof(GetPushNotifications), new { id = pushNotifications.Id }, pushNotifications)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, pushNotifications.Id.ToString()));
        }

    [HttpPost("mobile/employee")]
        [ValidateModel]
        public async Task<ActionResult<PushNotifications>> CreatePushNotificationsToEmployee([FromBody] PushNotifications pushNotifications)
        {
            _log.LogDebug($"REST request to save PushNotifications : {pushNotifications}");
            if (pushNotifications.Id != 0)
                throw new BadRequestAlertException("A new pushNotifications cannot already have an ID", EntityName, "idexists");
            pushNotifications = await _mediator.Send(new CreatePushNotificationsToEmployeeCommand { PushNotifications = pushNotifications });
            return CreatedAtAction(nameof(GetPushNotifications), new { id = pushNotifications.Id }, pushNotifications)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, pushNotifications.Id.ToString()));
        }





        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdatePushNotifications(long id, [FromBody] PushNotifications pushNotifications)
        {
            _log.LogDebug($"REST request to update PushNotifications : {pushNotifications}");
            if (pushNotifications.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != pushNotifications.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            pushNotifications = await _mediator.Send(new PushNotificationsUpdateCommand { PushNotifications = pushNotifications });
            return Ok(pushNotifications)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, pushNotifications.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PushNotifications>>> GetAllPushNotifications(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of PushNotifications");
            var result = await _mediator.Send(new PushNotificationsGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPushNotifications([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get PushNotifications : {id}");
            var result = await _mediator.Send(new PushNotificationsGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePushNotifications([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete PushNotifications : {id}");
            await _mediator.Send(new PushNotificationsDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
