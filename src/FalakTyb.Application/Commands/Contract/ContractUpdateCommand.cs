
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class ContractUpdateCommand : IRequest<Contract>
    {
        public Contract Contract { get; set; }
    }
}
