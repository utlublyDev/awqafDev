
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class ContractCreateCommand : IRequest<Contract>
    {
        public Contract Contract { get; set; }
    }
}
