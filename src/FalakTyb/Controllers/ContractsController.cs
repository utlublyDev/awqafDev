
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
using Quartz;
namespace awqaf.Controllers
{
    [Authorize]
    [Route("api/contracts")]
    [ApiController]
    public class ContractsController : ControllerBase
    {

        //: ControllerBase,IJob
        private const string EntityName = "contract";
        private readonly ILogger<ContractsController> _log;
        private readonly IMediator _mediator;

        public ContractsController(ILogger<ContractsController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Contract>> CreateContract([FromBody] Contract contract)
        {
            _log.LogDebug($"REST request to save Contract : {contract}");
            if (contract.Id != 0)
                throw new BadRequestAlertException("A new contract cannot already have an ID", EntityName, "idexists");
            contract = await _mediator.Send(new ContractCreateCommand { Contract = contract });
            return CreatedAtAction(nameof(GetContract), new { id = contract.Id }, contract)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, contract.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateContract(long id, [FromBody] Contract contract)
        {
            _log.LogDebug($"REST request to update Contract : {contract}");
            if (contract.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != contract.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            contract = await _mediator.Send(new ContractUpdateCommand { Contract = contract });
            return Ok(contract)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, contract.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contract>>> GetAllContracts(IPageable pageable)
        {
  
            
            _log.LogDebug("REST request to get a page of Contracts");
            
            var result = await _mediator.Send(new ContractGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }



 [HttpGet("checker/expiration")]

        public async Task<ActionResult<IEnumerable<ContractRespose>>> GetAllContractsExpiration(IPageable pageable)
        {
  
            
            _log.LogDebug("REST request to get a page of Contracts");
            
            var result = await _mediator.Send(new GetAllContractsExpirationQuery {Page = pageable});
            return Ok(result);
        }





        [HttpGet("{id}")]
        public async Task<IActionResult> GetContract([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Contract : {id}");
            var result = await _mediator.Send(new ContractGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContract([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Contract : {id}");
            await _mediator.Send(new ContractDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }



//     public  Task Execute(IJobExecutionContext context)
//         {

// //here want to integrate with email  service 
//             _log.LogInformation($"Notification Job: Notify User at {"result.ToString()"} and Jobtype: {GetContract(61).ToString()}");


// return Task.CompletedTask;

//         }






    }
}
